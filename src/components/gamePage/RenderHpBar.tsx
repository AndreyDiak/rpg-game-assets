import React, {FC} from "react";

type RenderHpBarType = {
  maxHP: number
  currentHP: number
  barWidth: number
  color: string
}

export const RenderHpBar: FC<RenderHpBarType> = React.memo(({maxHP, currentHP, barWidth, color}) => {

  return (
    <>
      <div className="gameContentBoard__block__hpBlock" style={{width: `${(currentHP/maxHP)*barWidth}px`, background: `${color}`}}>
        <div className="gameContentBoard__block__hpBlock__text">
          {currentHP} / {maxHP}
        </div>
      </div>
    </>
  )
})
