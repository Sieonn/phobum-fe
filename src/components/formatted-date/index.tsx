import dayjs from "dayjs";
import { colors } from "../../styles/colors";

interface Props{
    date?: string | Date;
    format?: string;
}

export default function FormattedDate({date, format = 'YYYY.MM.DD'}: Props){
    if (!date) return null; // 또는 "날짜 없음" 등 출력
    return <div style={{color:`${colors.gray100}`}}>{dayjs(date).format(format)}</div>
}