'use strict'

const User = use("App/Models/User")
const { validateAll } = use('Validator')
const { validate } = use('Validator')
const randomString = require('random-string')
const Mail = use('Mail')
const Hash = use('Hash')
const PasswordReset = use("App/Models/PasswordReset")

class AuthController {

  async getLogin({ view }) {
    return view.render('login')
  }

  async postLogin({ request, response, auth, session }) {
    const { email, password, remember } = request.all()
    // await auth.attempt(email, password)
    const user = await User.query()
      .where('email', email)
      .where('is_active', true)
      .first()

    if (user) {
      const passwordVerified = await Hash.verify(password, user.password)

      if (passwordVerified) {
        await auth.remember(!!remember).login(user)

        return response.route('profile')
      }
    }
    session.flash({
      notification: {
        type: 'danger',
        message: 'Login gagal, cek email terlebih dahulu'        
      } 
    })

    return response.redirect('back')
  }

  showRegisterForm ({ view }) {
    return view.render('auth.register')
  }

  async register({ request, session, response }) {
    const rules = {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|min:8'
    }

    const messages = {
      'username.required' : 'Username tidak boleh kosong',
      'email.required'    : 'Email tidak boleh kosong',
      'password.required' : 'Password tidak boleh kosong',
      'email.unique'      : 'Email telah terdaftar, silahkan cek email anda',
      'username.unique'   : 'Username telah digunakan, silahkan gunakan username yang lain',
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])

      return response.redirect('back')
    }

    const user = await User.create({ 
      username : request.input('username'),
      email : request.input('email'),
      password : request.input('password'),
      confirmation_token: randomString({ length: 40 })
    })

    await Mail.send('auth.emails.confirm_email', user.toJSON(), message => {
      message
        .to(user.email)
        .from('wirya_tama99@hotmail.com')
        .subject('Konfirmasi Email')
    })

    session.flash({ 
      notification: {
        type: 'success',
        message: "Registrasi berhasil! Silahkan buka email untuk konfirmasi pendaftaran."
      }
    })

    return response.redirect('back')
  }

  async confirmEmail({ params, session, response }){
    const user = await User.findBy('confirmation_token', params.token)

    user.confirmation_token = null
    user.is_active = true

    await user.save()

    session.flash({ 
      notification: {
        type: 'success',
        message: 'Your email has been confirmed'
      }
    })

    return response.redirect('/login')
  }
  
  async postLogout({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }

  async getProfile({ auth, view }) {
    const user = auth.user.toJSON()
    return view.render('profile', {user: user})
  }

  showLinkRequestForm ({ view }) {
    return view.render('auth.passwordemail')
  }

  async sendResetLinkEmail ({ request, session, response }){
    const validation = await validate(request.only('email'), {
      email: 'required|email'
    })

    if (validation.fails()) {
      session.withErrors(validation.message()).flashAll()

      return response.redirect('back')
    }

    try {
      const user = await User.findBy('email', request.input('email'))

      await PasswordReset.query().where('email', user.email).delete()

      const { token } = await PasswordReset.create({
        email: user.email,
        token: randomString({ length: 40 })
      })

      const mailData = {
        user: user.toJSON(),
        token
      }
      
      await Mail.send('auth.emails.password_reset', mailData, message => {
        message
        .to(user.email)
        .from('wirya_tama99@hotmail.com')
        .subject('Password reset link')
      })

      session.flash({ 
        notification: {
          type: 'success',
          message: 'A password reset link has been sent to your email address.'
        }
      })

      return response.redirect('back')
    } catch (error) {
      session.flash({ 
        notification: {
          type: 'danger',
          message: 'Sorry, there is no user with this email address.'
        }
      })

      return response.redirect('back')
    }
  }

  showResetForm ({ params, view }) {
    return view.render('auth.passwordreset', { token: params.token })
  }

  async reset ({ request, session, response }) {
    const rules = {
      token: 'required',
      email: 'required',
      password: 'required|min:8|confirmed'
    }

    const messages = {
      'token.required'    : 'Token tidak boleh kosong',
      'email.required'    : 'Email tidak boleh kosong',
      'password.required' : 'Password tidak boleh kosong',
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password', 'password_confirmation'])

      return response.redirect('back')
    }

    try {
      const user = await User.findBy('email', request.input('email'))

      const token = await PasswordReset.query()
        .where('email', user.email)
        .where('token', request.input('token'))
        .first()

      if (!token) {
        session.flash({
          notification: {
            type: 'danger',
            message: 'This password reset token does not exist.'
          }
        })

        return response.redirect('back')
      }

      user.password = await Hash.make(request.input('password'))
      await user.save()
      
      await PasswordReset.query().where('email', user.email).delete()

      session.flash({
        notification: {
          type: 'success',
          message: 'Your password has been reset'
        }
      })

      return response.redirect('/login')

    } catch (error) {
      session.flash({
        notification: {
          type: 'danger',
          message: 'Sorry, there is no user with this email address.'
        }
      })

      return response.redirect('back')
    }
  }
}

module.exports = AuthController
