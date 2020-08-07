import {
    Button,
    Image as VanImage,
    Col,
    Row,
    Popup,
    Calendar,
    Toast,
    Notify,
    Loading,
    Dialog,
    Uploader,
    Divider,
    Empty,
    List,
    Sticky,
    Swipe,
    SwipeItem,
    Tag,
    Tab,
    Tabs,
    Tabbar,
    TabbarItem,
    Icon,
    Search
} from "vant";
let vantUIs = [
    Button,
    VanImage,
    Col,
    Row,
    Popup,
    Calendar,
    Toast,
    Notify,
    Loading,
    Dialog,
    Uploader,
    Divider,
    Empty,
    List,
    Sticky,
    Swipe,
    SwipeItem,
    Tag,
    Tab,
    Tabs,
    Tabbar,
    TabbarItem,
    Icon,
    Search
];

import 'vant/lib/icon/local.css'

export default {
    install(Vue) {
        vantUIs.forEach(vantUI => [
            //Vue.component(vantUI.name, vantUI)
            Vue.use(vantUI) // 也可以使用 Vue.use()
        ]);
    }
};