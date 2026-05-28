import style from './Profile.module.css'
import CardHeader from './cardHeader';
import CardContent from './cardContent';
import CardExtraInfo from './cardExtraInfo';
import CardFooter from './cardFooter';

const Profile = ({data}) => {
    if (!data) return null;

  return (
    <div className={style.profile_container}>
        <div className={style.id_card}>
            <CardHeader data={data} />
            <CardContent data={data} />
            <CardExtraInfo data={data} />
            <CardFooter data={data} />
        </div>
    </div>
  )
}


export default Profile