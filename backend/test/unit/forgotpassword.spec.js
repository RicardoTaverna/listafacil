const { test, trait } = use('Test/Suite')('Forgot Password');

const Mail = use('Mail')
const Hash = use('Hash')

/**@type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/**@type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient');
//trait('DatabaseTransactions')


test('it should send an email with reset password instruction', async({ assert, client }) => {
    Mail.fake()
    const email = 'ygorsa1998@hotmail.com';
    
    const user = await Factory
        .model('App/Models/User')
        .create({ email });

    const emailTest = user.email
    const userid = user.id;
    await client
        .post('/forgot')
        .send({ emailTest })
        .end();
    
    const token  = await user.tokens().first(userid);
    console.log(token)


    const recentEmail = Mail.pullRecent()

    assert.equal(recentEmail.message.to[0].address, email)


    assert.include(token.toJSON(), {
        type: 'forgotpassword',
    })

    Mail.restore()
});

//chama uma rota /reset (token, senha nova, confirmacao, senha precisa mudar)
//ele só vai resetar se o token tiver sido criado a menos de 24 horas

test('it should reset password ', async ({ assert, client }) => {
    const email = 'ygorsa1998@hotmail.com';
    
    const user = await Factory.model('App/Models/User').create({ email })
   
    const userToken = await Factory.model('App/Models/Token').make()

    await user.tokens().save(userToken)

  


    /*const { token } = await Factory
        .model('App/Models/Token')
        .create({type: 'forgotpassword'})
    */
 
    

    const response = await client
        .post('/reset')
        .send({
            token: userToken.token,
            password: '123456',
            password_confirmation: '123456'
        })
        .end()

    response.assertStatus(204);

    await user.reload();
     
    const checkPassword = await Hash.verify('123456', user.password);

    assert.isTrue(checkPassword);

});






