import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const generateDate = moment().format('L');
