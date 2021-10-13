import { FormLogin } from "../components/form_login.jsx"

export default function LoginPage(props){
    const {changeMenuAndAppBarVisibility} = props;
    return <FormLogin changeMenuAndAppBarVisibility={changeMenuAndAppBarVisibility}/>
}