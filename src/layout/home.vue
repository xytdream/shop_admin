<template>
    <el-container class="home_container">
        <!-- 头部区域 -->
        <el-header>
            <div class="logo">
                <img src="../assets/images/logo.png" alt="logo">
                <span>电商后台管理系统</span>
            </div>
            <el-button type='info' class="logout" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse?'64px':'200px'">
                <!-- 菜单折叠按钮 -->
                <div class="btn_collapse" @click="toggleCollapse">{{isCollapse? '三':'|||'}}</div>
                <!-- 菜单 -->
                <el-menu background-color="#333744" text-color="#ffffff" active-text-color="#409eff" router unique-opened 
                    :collapse="isCollapse" :collapse-transition='false' :default-active="$route.path">
                    <!-- 一级菜单 -->
                    <el-submenu :index="menu.id + ''" v-for="menu in menuList" :key="menu.id">
                        <!-- 一级菜单模板 设置菜单名，菜单icon等等 -->
                        <template slot="title">
                            <!-- icon -->
                            <i :class="icons[menu.id]"></i>
                            <!-- 标题 -->
                            <span>{{menu.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + item.path" v-for="item in menu.children" :key="item.id">
                            <template slot="title">
                                <!-- icon -->
                                <i class="el-icon-menu"></i>
                                <!-- 标题 -->
                                <span>{{item.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 内容主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less" scoped>
    .home_container{
        height: 100%;
    }

    //头部区域
    .el-header{
        background: #373d41;
        padding-left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        >div{
            display: flex;
            align-items: center;
            
            >span{
                color: #ffffff;
                font-size: 20px;
                margin-left: 15px;
            }
        }
    }
    //侧边栏区域
    .el-aside{
        background: #333744;
        .btn_collapse{
            background: #4a5064;
            font-size: 10px;
            line-height: 24px;
            color: #ffffff;
            text-align: center;
            letter-spacing: .2em;
            cursor: pointer;
        }
        .el-menu{
            border-right: none;
        }
    }
    //内容主体区域
    .el-main{
        background: #eaedf1;
        // padding: 0;
    }

    .iconfont{
        margin-right: 10px;
    }
</style>

<script>
export default {
    data(){
        return {
            // 左侧菜单栏数据
            menuList: [],
            // 菜单图标数组
            icons:{
                '125': 'iconfont icon-user',
                '103': 'iconfont icon-tijikongjian',
                '101': 'iconfont icon-shangpin',
                '102': 'iconfont icon-danju',
                '145': 'iconfont icon-baobiao',
            },
            //菜单折叠标志
            isCollapse: false
        }
    },
    methods: {
        // 退出方法
        logout(){
            // 清空缓存
            window.sessionStorage.clear()
            //重定向到登录页面
            this.$router.push('/login')
        },

        //获取左边侧边栏菜单数据
        async getMenuList(){
            const {data: res} = await this.$http.get('menus')
            console.log(res)
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)

            this.menuList = res.data
        },
        //控制菜单折叠
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        }
    },
    created(){
        this.getMenuList()
        console.log(this.$route.path)
    }
}
</script>