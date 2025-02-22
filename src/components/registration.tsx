import React from "react"
import { forgotPassword, registration } from "../DB/api.ts";
import style from './registration.module.css';


export function Registration() {

    const handleClick = async (eve: any) => {
        eve.preventDefault();
        const name = eve.target.name.value;
        const bio = eve.target.about.value;
        const dob = eve.target.dob.value;
        const id = eve.target.username.value;
        const password = eve.target.password.value;
        const res = await registration(name, id, password, dob, bio);
    }
    const navigateLogin = () => window.location.href=('login')
    const navigateRegistration = () => window.location.href=('registration')


    return (
        <body className={style.body}>
            <h1 className={`${style.h1}`}>GroceryList</h1>
            <div className={style.formDiv}>
                <form onSubmit={handleClick}>
                        <div>
                            <table className={`${style.table}`}>
                                <tr>
                                    <td className={style.td}><label htmlFor="name" className={`${style.element} ${style.label}`}>Name * </label></td>
                                    <td className={style.td}><input type="text" name="name" id="name" className="input" placeholder="Name" required /></td>
                                </tr>
                                <tr>
                                    <td className={style.td}><label htmlFor="dob" className={`${style.element} ${style.label}`}>DOB * </label></td>
                                    <td className={style.td}><input type="date" name="dob" id="dob" className="input" placeholder="Date of Birth" required /></td>
                                </tr>
                                <tr>
                                    <td className={style.td}><label htmlFor="uname" className={`${style.element} ${style.label}`}>Email * </label></td>
                                    <td className={style.td}><input type="text" name="username" id="username" className="input" placeholder="Email" required /></td>
                                </tr>
                                <tr>
                                    <td className={style.td}><label htmlFor="pass" className={`${style.element} ${style.label}`}>Password * </label></td>
                                    <td className={style.td}><input type="password" name="password" id="password" className="input" placeholder="Password" required /></td>
                                </tr>
                                <tr>
                                    <td className={style.td}><label htmlFor="cpass" className={`${style.element} ${style.label}`}>Password * </label></td>
                                    <td className={style.td}><input type="password" name="cpassword" id="cpassword" className="input" placeholder="Confirm Password" required /></td>
                                </tr>
                                <tr>
                                    <td className={style.td}><label htmlFor="about" className={`${style.element} ${style.label}`}>About </label></td>
                                    <td className={style.td}><textarea name="about" id="about" className="input" placeholder="About/Bio optional" /></td>
                                </tr>
                            </table>
                        </div>
                        <div className={style.foot}>
                            <button type="submit" >submit</button>
                            <p className={`${style.link}`} onClick={navigateLogin}>sign in?</p>
                            <p className={style.link} onClick={navigateRegistration}>want to crete account?</p>
                        </div>
                </form>
            </div>
            <div>
            </div>
        </body>
    );
}




export function ForgotPassword() {
    const handleClick = async (eve: any) => {
        eve.preventDefault();
        const id = eve.target.username.value;
        const password = eve.target.password.value;
        const res = await forgotPassword(id, password);
    }
    return (
        <body className="body">
            <h1>GroceryList</h1>
            <div className="formDiv">
                <form onSubmit={handleClick}>
                        <div>
                            <label htmlFor="uname">Email </label><input type="text" name="username" id="username" placeholder="email" required />;
                        </div>
                        <div>
                            <button type="submit">submit</button>
                        </div>
                        <div>
                            <p className="p"></p>
                        </div>
                </form>
            </div>
            <div>
            </div>
        </body>
    );
}

