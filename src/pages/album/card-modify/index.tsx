import React, { useCallback, useEffect, useState } from 'react';
import { AuthorandDateStyle,  ButtonGroup, CancelButton, Form, ImageUploadArea,  ModifyContent, } from './index.styled';
import { ImageResponse, ImageUpdateRequest } from '../../../api/images';
import { CommonOverlay } from '../../../components/bottom-sheet/index.styled';
import axios from 'axios';
import { imagesApi } from '../../../api/images';
import { Input2 } from '../../../components/input copy';
import { Button } from '../../../components/button';
import { colors } from '../../../styles/colors';
import FormattedDate from '../../../components/formatted-date';

interface CardModifyProps {
  image: ImageResponse;
  onClose: () => void;
  onSave: (updatedImage: ImageResponse) => Promise<void>;
}

export default function CardModify({ image, onClose, onSave }: CardModifyProps) {
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(image.image_url);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Clean up previous blob URL if it exists
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      
      // 파일이 선택되었음을 콘솔에 로깅
      console.log('새 이미지 파일이 선택됨:', file.name);
    }
  }, [previewUrl]);
  
  const isFormFilled = title.trim() !== '' && description.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setIsSubmitting(true);

    try {
      const updateData: ImageUpdateRequest = {
        title,
        description,
        image: selectedFile || undefined
      };

      const response = await imagesApi.update(image.id, updateData);
      
      // 수정된 이미지 정보를 부모 컴포넌트에 전달
      const updatedImage = {
        ...image,
        title: title,
        description: description,
        image_url: selectedFile ? URL.createObjectURL(selectedFile) : image.image_url
      };
      
      onSave(updatedImage);
      onClose();
    } catch (error) {
      console.error('이미지 수정 실패:', error);
      alert('이미지 수정에 실패했습니다.');
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <CommonOverlay onClick={onClose} style={{background:'none', backdropFilter:'none'}}>
      <ModifyContent onClick={e => e.stopPropagation()}>
        
        <Form onSubmit={handleSubmit}>
          <ImageUploadArea>
            <img src={previewUrl} alt="Preview" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              id="imageUpload"
            />
            <label htmlFor="imageUpload">이미지 변경</label>
          </ImageUploadArea>
       
          <Input2 label='제목'  value={title}
              onChange={(e) => setTitle(e.target.value)}  placeholder="제목을 입력하세요"
              required/>
      
           <Input2 label='설명'  value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="설명을 입력하세요" type="textarea"/>
              <AuthorandDateStyle>
              <div style={{marginLeft:'auto', color:`${colors.neon100}`}}>{image.users.nickname}</div>
              <FormattedDate date={image.updated_at}/>
              </AuthorandDateStyle>
           </Form>
          <ButtonGroup>
    
           <CancelButton onClick={onClose} disabled={isSubmitting}>취소</CancelButton>
            <Button  disabled={isSubmitting || !isFormFilled}
  status={isFormFilled ? 'active' : 'default'} onClick={handleSubmit} style={{flex:'1'}}>{isSubmitting ? '저장 중...' : '저장'}</Button>
          </ButtonGroup>
      </ModifyContent>
    </CommonOverlay>
  );
}