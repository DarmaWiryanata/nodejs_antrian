const { hooks } = use('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    const Env = use('Env')
    const View = use('View')

    View.global('APP_URL', function () {
        return Env.get('APP_URL')
    })
})