import React from 'react'
import './LoginPage.css'
import {Link} from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className='login'>
            <div className='login-whole-box'>
                <form className='login-box'>
                    <h1 className='form-head'>登录</h1>
                    
                    <div className='form'>
                        <label>邮箱</label>
                        <input 
                            type='email' 
                            placeholder='输入邮箱'/>
                    </div>

                    <div className='form'>
                        <label>密码</label>
                        <input 
                            type='password' 
                            placeholder='输入密码'/>
                    </div>

                    <div className='button-submit-box'>
                        <button type='submit' className='button-submit'>提交</button>
                    </div>

                    <div className='reg-link-box'>
                        <Link to='/register' className='reg-link'>
                            <h5>还没注册？点此注册</h5>
                        </Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
