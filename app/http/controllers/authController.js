const User = require('../../models/user')
const bcrypt = require('bcrypt')
function authController() {
    return {
        login(req, res) {

            res.render('auth/login')
        },
        register(req, res) {

            res.render('auth/register')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            //Validate request 
            if (!name || !email || !password) {
                req.flash('error', 'All Fields are required ')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
            
            //hash Password 
            const hashedPassword = await bcrypt.hash(password, 10)


            // Create a User 
            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            user.save().then((user) => {

                //login


                return res.redirect('/')


            }).catch(err => {

                req.flash('error', 'Something went wrong')

                return res.redirect('/register')



            })




            console.log(req.body)

        }
    }
}

module.exports = authController