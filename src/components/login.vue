<template>
    <div id="login_page">
        <div class="login_box">
            <!-- 头像框 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="头像" class="avatar">
            </div>
            <!-- 登录表单 -->
            <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="less" scoped>
    #login_page{
        background: #263238;
        height: 100%;
        position: relative;
    }
    .login_box{
        width: 400px;
        height: 300px;
        background: #ffffff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);

        .avatar_box{
            width: 100px;
            height: 100px;
            border: 1px solid #cccccc;
            border-radius: 50%;
            box-sizing: border-box;
            padding: 10px;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background: #ffffff;

            .avatar{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid #cccccc;
            }
        }

        .login_form{
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            .btns{
                display: flex;
                justify-content: flex-end;
            }
        }
    }
</style>

<script>
export default {
    data(){
        return {
            //登录表单数据
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            //登录表单验证数据
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        //登录方法
        login(){
            //首先对表单数据进行校验
            this.$refs.loginFormRef.validate( async valid =>{
                //校验不通过，直接return
                if(!valid) return;
                //校验通过，  发起登录请求
                const {data: res} =  await this.$http.post('login',this.loginForm)
                console.log(res)
                //登录失败，返回失败的原因
                if(res.meta.status !== 200)  return this.$message.error(res.meta.msg)
                //登陆成功
                //1.提示登录成功
                this.$message.success('登录成功')
                //2.保存后台传过来的token值到sessionStorage
                //保存token是因为除了login页面，其他页面都应该在登录后才能访问，而token是用来鉴别登录状态和登录身份的
                window.sessionStorage.setItem('token',res.data.token)
                //3.通过编程式导航跳转到home页面
                this.$router.push('/home')
            })
        },
        //重置表单
        reset(){
            this.$refs.loginFormRef.resetFields()
        }
    },
}
</script>