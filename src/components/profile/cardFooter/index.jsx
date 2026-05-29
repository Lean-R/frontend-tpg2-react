import style from "@components/profile/cardFooter/CardFooter.module.css"

const CardFooter = ({data}) => {
    if (!data) return null;
    const {footerQuote} = data;
  return (
                <div className={style.card_footer}>
                    <p>
                        {footerQuote}
                    </p>
                </div>
  )
}

export default CardFooter
