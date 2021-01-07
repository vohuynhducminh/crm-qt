export class Notification {
  Id: string;
  Type: string;
  Title: string;
  Body: string;
  NData?: any;
  IsSeen: boolean;
  DateCreated: string;
  TimeStatus?: string;

  public static calculateTimeStatus(notification: Notification) {
    const date = new Date(notification.DateCreated);
    const secs = Math.floor((Date.now() - date.getTime()) / 1000);
    let result = '';
    if (secs < 60) {
      if (secs < 10) {
        result = 'Vừa xong';
      } else if (secs < 30) {
        result = 'Vài giây trước';
      } else {
        result = `${secs} giây trước`;
      }
    } else {
      const mins = Math.floor(secs / 60);
      if (mins < 2) {
        result = '1 phút trước';
      } else if (mins < 60) {
        result = `${mins} phút trước`;
      } else {
        const hours = Math.floor(mins / 60);
        const curHour = new Date().getHours();
        if (hours <= curHour) {
          if (hours < 2) {
            result = '1 giờ trước';
          } else {
            result = `${hours} giờ trước`;
          }
        } else {
          let h = date.getHours();
          const m = date.getMinutes();
          let _m = '';
          if (`${m}`.length < 2) { _m = '0'; }
          if (hours <= curHour + 23) {
            let postFix = 'am';
            if (h > 12) {
              h -= 12;
              postFix = 'pm';
            }
            result = `Hôm qua lúc ${h}:${_m}${m} ${postFix}`;
          } else {
            const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
            const wd = date.getDay();
            const curWd = new Date().getDay();
            let postFix = 'am';
            if (h > 12) {
              h -= 12;
              postFix = 'pm';
            }
            if (wd < curWd) {
              result = `${days[wd]} lúc ${h}:${_m}${m} ${postFix}`;
            } else {
              const d = date.getDate();
              const M = date.getMonth() + 1;
              const yyyy = date.getFullYear();
              let _d = '';
              if (`${d}`.length < 2) { _d = '0'; }
              let _M = '';
              if (`${M}`.length < 2) { _M = '0'; }
              result = `${_d}${d}/${_M}${M}/${yyyy} lúc ${h}:${_m}${m} ${postFix}`;
            }
          }
        }
      }
    }
    notification.TimeStatus = result;
  }
}
