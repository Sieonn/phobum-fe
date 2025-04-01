import { useState } from "react";
import { Input } from "../../../../components/input";
import { Container } from "./index.styled";
import { PatchCard } from "../../../../types/card";

export default function Form(){
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        author:"",
    })
    const [value, setValue] = useState('');
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, field: keyof PatchCard ) => {
        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: e.target.value
            };
            return newData;
        })
    }
    return(
        <Container>
            <Input label="제목" value={formData.title}  onChange={(e) => handleChange(e,"title")}/>
            <Input label="설명" value={formData.description} onChange={(e) => handleChange(e,"description")}/>
            <Input label="작성자" value={formData.author}onChange={(e) => handleChange(e,"author")}/>
        </Container>
    )
}