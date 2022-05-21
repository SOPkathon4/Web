import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { api } from '../services/api';
import codeState from '../stores';

export default function Result() {
  const [commentList, setCommentList] = useState<string[]>([]);
  const code = useRecoilValue(codeState);
  const [isModal, setIsModal] = useState(false);
  const getResult = async (code) => {
    const list = await api.seyoungService.getResult(code);
    setCommentList(list);
  };

  useEffect(() => {
    getResult(code);
  }, []);
  return (
    <Container>
      <GroupName>
        <span>몽몽이들의 추억</span>
      </GroupName>
      {commentList.map((data, idx) => {
        return <CommentContainer key={idx}>{data}</CommentContainer>;
      })}
      <ShareBtn onClick={() => setIsModal(!isModal)}>
        <span>일상추억 공유</span>
      </ShareBtn>
      {isModal && (
        <ResultModal>
          <span>완성된 우리의 이야기</span>
          {commentList.map((data, idx) => {
            return <CommentContainer key={idx}>{data}</CommentContainer>;
          })}
          <button>공유하기</button>
        </ResultModal>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: column;
  justify-content: column;
`;

const GroupName = styled.div`
  width: 570px;
  height: 80px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  & > span {
    display: inline-block;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;

    color: #000000;
  }
`;
const ShareBtn = styled.button`
  width: 387px;
  height: 80px;
  background: #ffffff;
  border: 2px solid #000000;
  box-shadow: 10px 10px 0px #000000;
  border-radius: 20px;
  text-align: center;

  & > span {
    font-weight: 700;
    font-size: 32px;
    color: #000000;
  }
`;
const CommentContainer = styled.div``;
const ResultModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: column;
  justify-content: column;
`;
