import React from 'react';

import { ButtonGroup, CancelButton, Form, Input, InputGroup, Label, ModifyContent, SaveButton, TextArea, Title } from './index.styled';
import { ImageResponse } from '../../../api/images';
import { CommonOverlay } from '../../../components/bottom-sheet/index.styled';

interface CardModifyProps {
  image: ImageResponse;
  onClose: () => void;
  onSave: (updatedImage: Partial<ImageResponse>) => void;
}

export default function CardModify({ image, onClose, onSave }: CardModifyProps) {
  const [title, setTitle] = React.useState(image.title);
  const [description, setDescription] = React.useState(image.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
    });
  };

  return (
    <CommonOverlay onClick={onClose}>
      <ModifyContent onClick={e => e.stopPropagation()}>
        <Title>이미지 수정</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>제목</Label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </InputGroup>
          <InputGroup>
            <Label>설명</Label>
            <TextArea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="설명을 입력하세요"
            />
          </InputGroup>
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>취소</CancelButton>
            <SaveButton type="submit">저장</SaveButton>
          </ButtonGroup>
        </Form>
      </ModifyContent>
    </CommonOverlay>
  );
}