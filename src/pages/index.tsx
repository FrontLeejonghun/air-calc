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
  rmv: number;
  tankLiter: number;
  startAir: number;
  planTime: number;
}

export default function Index() {
  const { register, handleSubmit, setValue, control, getValues } =
    useForm<FormData>({});

  const [sacResult, rmv] = useWatch({
    control,
    name: ['sacResult', 'rmv'],
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
    const sac = calcAir / Ata;

    setValue('sacResult', {
      calcAir,
      Ata,
      sac,
      usingAir,
      stayTime,
    });
  };

  const calcPlanSAC = () => {
    // (탱크 리터 * 시작 공기압) * SAC = RMV
    const Ata = getAta(getValues('planDepth'), false);
    const rmv = getValues('tankLiter') * sacResult.sac * Ata;
    setValue('rmv', rmv);
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
                  {sacResult.Ata} = {sacResult.sac.toLocaleString()}
                </dd>
              </Result>

              <Result>
                <dt>SAC :</dt> <dd>{sacResult.sac.toLocaleString()} Bar/min</dd>
              </Result>
            </>
          )}

          <StyledButton>계산하기</StyledButton>
        </Content>

        {sacResult && (
          <Content>
            <Title>RMV(Respiratory Minute Volume) 계산기</Title>

            <InputContentWrap>
              <Label htmlFor={'tank-liter'}>탱크 리터:</Label>
              <Input
                id={'tank-liter'}
                {...register('tankLiter')}
                inputMode={'numeric'}
                placeholder={'Liter 단위로 입력해주세요.'}
                type={'number'}
              />
              L
            </InputContentWrap>

            <InputContentWrap>
              <Label htmlFor={'plan-time'}>계획된 다이빙 시간 :</Label>
              <Input
                id={'plan-time'}
                {...register('planTime')}
                inputMode={'numeric'}
                placeholder={'분 단위로 입력해주세요.'}
                type={'number'}
              />
              분
            </InputContentWrap>

            <InputContentWrap>
              <Label htmlFor={'plan-depth'}>계획된 수심:</Label>
              <Input
                id={'plan-depth'}
                {...register('planDepth')}
                inputMode={'numeric'}
                placeholder={'1m 단위로 입력해주세요.'}
                type={'number'}
              />
              M
            </InputContentWrap>
            {rmv && (
              <>
                <Result>
                  <dt>계산식</dt>
                  <dd>탱크 리터 * SAC = RMV</dd>
                  <dd>
                    {getValues('tankLiter')} *{' '}
                    {getValues('sacResult.sac').toLocaleString()} ={' '}
                    {(
                      getValues('tankLiter') * getValues('sacResult.sac')
                    ).toLocaleString()}
                    L / min
                  </dd>
                </Result>
                <Result>
                  <dt>수심 기준 다이빙 공기 소모율</dt>
                  <dd>RMV * 절대 압력 = 수심 기준 다이빙 공기 소모율</dd>
                  <dd>
                    {(
                      getValues('tankLiter') * getValues('sacResult.sac')
                    ).toLocaleString()}{' '}
                    * {getAta(getValues('planDepth'), false)} ={' '}
                    {(
                      getValues('tankLiter') *
                      getValues('sacResult.sac') *
                      getAta(getValues('planDepth'), false)
                    ).toLocaleString()}
                    L / min
                  </dd>
                </Result>
                <Result>
                  <dt>계획된 다이빙 시간 기준 공기 소모율</dt>
                  <dd>
                    수심 기준 다이빙 공기 소모율 * 계획된 다이빙 타임 = 계획된
                    다이빙 시간 기준 공기 소모율{' '}
                  </dd>
                  <dd>
                    {(
                      getValues('tankLiter') *
                      getValues('sacResult.sac') *
                      getAta(getValues('planDepth'), false)
                    ).toLocaleString()}{' '}
                    * {getValues('planTime')} ={' '}
                    {(
                      getValues('tankLiter') *
                      getValues('sacResult.sac') *
                      getAta(getValues('planDepth'), false) *
                      getValues('planTime')
                    ).toLocaleString()}{' '}
                    L / {getValues('planTime')} min
                  </dd>
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
