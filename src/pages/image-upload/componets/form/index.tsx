import { useState } from "react";
import { Input2 } from "../../../../components/input copy";
import { useStore } from "../../../../store/store";
import { Container } from "./index.styled";


interface FormProps {
    onChange: (data: { title: string; description: string; author: string }) => void;
    initialData: {
        title: string;
        description: string;
        author: string;
    };
}

export default function Form({ onChange, initialData }: FormProps) {
    const [formData, setFormData] = useState(initialData);
    const user = useStore(); // ✅ 유저 정보 가져오기

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
        const newData = {
            ...formData,
            [field]: e.target.value
        };
        setFormData(newData);
        onChange(newData);
    };

    return (
        <Container>
            <Input2 
                label="제목" 
                value={formData.title}  
                onChange={(e) => handleChange(e, "title")} 
                placeholder="제목을 입력해주세요."
            />
            <Input2 
                label="설명" 
                value={formData.description} 
                onChange={(e) => handleChange(e, "description")} 
                placeholder="설명을 입력해주세요."
                type="textarea"
            />
            <Input2 
                label="작성자"
                value={user?.user?.nickname || ''} // ✅ 여기!
                disabled={true}
                readOnly={true}
            />
        </Container>
    );
}
