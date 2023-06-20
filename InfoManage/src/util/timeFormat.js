//导入moment时间库
import moment from 'moment'
//设置为中文格式
moment.locale("zh-cn")


const timeFormat = {
    getTime: (date) => {
        return moment(date).format('YYYY-MM-DD')
    }
}

export default timeFormat