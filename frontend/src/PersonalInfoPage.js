import './PersonalInfoPage.css'

import React from 'react'

const PersonalInfoPage = () => {
    return (
        <div className='personalinfopage'>
			<div className="head">
				<h1>个人信息</h1>
			</div>

			<div className="text">
				<h3>ID :</h3>
				<h3>姓名 :</h3>
				<h3>地址 :</h3>
				<h3>电话 :</h3>
			</div>

			<div className="textinfo">
				<div class="idinfo">
					<h4>输出ID</h4>
					// getid
				</div>
				<div className="nameinfo">
					<h4>输出姓名</h4>
					// getname
				</div>
				<div className="addinfo">
					<h4>输出地址</h4>
					// getadd
				</div>
				<div className="phoneinfo">
					<h4>输出电话</h4>
					//getphone
				</div>
			</div>
        </div>
    )
}

export default PersonalInfoPage