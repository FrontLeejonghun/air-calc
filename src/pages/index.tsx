import { useForm, useWatch } from 'react-hook-form';
import styled from '@emotion/styled';

import Input from '@/components/Input';

const PageWrap = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  top: 50%;
  left: 50%;
  padding: 20px;
  flex: 1;
  margin: 0 auto;
`;

const ContentWrap = styled.div`
  display: flex;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 3px 12px 0 rgba(165, 163, 171, 0.18);
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid #a5a3ab2d;
  flex-direction: column;
  gap: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  &:first-child {
    padding-bottom: 30px;
    border-bottom: 1px solid #f4f4f4;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.h1};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  width: 100%;
  font-weight: 500;
  white-space: pre-wrap;
  word-break: keep-all;
`;

const InputContentWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fonts.size.h4};
  min-width: 200px;
`;

const StyledButton = styled.button`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray['04']};
  padding: 10px;
  width: 100%;
`;

const Result = styled.dl`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  dt {
    min-width: 110px;
  }

  dd {
    white-space: pre-wrap;
    word-break: keep-all;
  }
`;

interface FormData {
  depth: number;
  stayTime: number;
  usingAir: number;
  planDepth: number;
  sacResult: {
    calcAir: number;
    Ata: number;
    sac: number;
    usingAir: number;
    stayTime: number;
  };
  planSac: number;
}

export default function Index() {
  const { register, handleSubmit, setValue, control, getValues } =
    useForm<FormData>({});

  const [sacResult, planSac] = useWatch({
    control,
    name: ['sacResult', 'planSac'],
  });

  const getAta = (depth: number, ceil: boolean = true) => {
    return ceil
      ? (Math.ceil(depth / 10) * 10 + 10) / 10
      : ((depth / 10) * 10 + 10) / 10;
  };

  const onSubmit = (data: FormData) => {
    const { depth, stayTime, usingAir } = data;

    const calcAir = usingAir / stayTime;

    const Ata = getAta(depth);
    const sac = Math.ceil(calcAir / Ata);

    setValue('sacResult', {
      calcAir,
      Ata,
      sac,
      usingAir,
      stayTime,
    });
  };

  const calcPlanSAC = () => {
    const Ata = getAta(getValues('planDepth'), false);
    const planSac = sacResult.sac * Ata;
    console.log(planSac, 'planSac', Ata);
    setValue('planSac', planSac);
  };

  return (
    <PageWrap>
      <ContentWrap>
        <Content as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Title>SAC(surface air consumption) 계산기</Title>
          <InputContentWrap>
            <Label htmlFor={'depth'}>수심(M):</Label>
            <Input
              {...register('depth', {
                max: 40,
                maxLength: 2,
                required: true,
              })}
              id={'depth'}
              inputMode={'numeric'}
              max={40}
              placeholder={'10m 단위로 올림 처리'}
              type={'number'}
              required
            />
            M
          </InputContentWrap>

          <InputContentWrap>
            <Label htmlFor={'using-air'}>사용한 공기량(Bar):</Label>
            <Input
              {...register('usingAir', {
                required: true,
              })}
              id={'using-air'}
              inputMode={'numeric'}
              placeholder={'1Bar 단위로 입력해주세요.'}
              type={'number'}
              required
            />
            Bar
          </InputContentWrap>

          <InputContentWrap>
            <Label htmlFor={'stay-time'}>머무른 시간:</Label>
            <Input
              id={'stay-time'}
              {...register('stayTime', {
                required: true,
              })}
              inputMode={'numeric'}
              placeholder={'1분 단위로 입력해주세요.'}
              type={'number'}
              required
            />
            분
          </InputContentWrap>

          {sacResult && (
            <>
              <Result>
                <dt>계산식 :</dt>
                <dd>(사용한 공기량 / 머무른 시간) / 절대 압력 = SAC</dd>
                <dd>
                  ({sacResult.usingAir} / {sacResult.stayTime}) /{' '}
                  {sacResult.Ata} ={sacResult.sac}
                </dd>
              </Result>

              <Result>
                <dt>SAC :</dt> <dd>{sacResult.sac} Bar/min</dd>
              </Result>
            </>
          )}

          <StyledButton>계산하기</StyledButton>
        </Content>

        {sacResult && (
          <Content>
            <Title>계획중인 다이빙 공기소모량 계산기</Title>

            <InputContentWrap>
              <Label htmlFor={'plan-depth'}>계획 다이빙 최대수심:</Label>
              <Input
                id={'plan-depth'}
                {...register('planDepth')}
                inputMode={'numeric'}
                placeholder={'1m 단위로 입력해주세요.'}
                type={'number'}
              />
              M
            </InputContentWrap>
            {planSac && (
              <>
                <Result>
                  <dt>최대 수심 공기 소모량</dt>
                  <dd>{planSac} Bar/min</dd>
                </Result>
                <Result>
                  <dt>
                    다이빙 가능 시간 200Bar 기준
                    <br />
                    (비상 60Bar)
                  </dt>
                  <dd>200 - 60 = 140</dd>
                  <dd>{(140 / planSac).toFixed(2)}분</dd>
                </Result>
              </>
            )}

            <StyledButton onClick={calcPlanSAC}>계산하기</StyledButton>
          </Content>
        )}
      </ContentWrap>
    </PageWrap>
  );
}
