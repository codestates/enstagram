import '../App.css'
import './ProfileEdit.css'
import EditSidebar from '../components/ProfileEdit/EditSidebar'
import BasicProfileEdit from '../components/ProfileEdit/BasicProfileEdit'
import PasswordEdit from '../components/ProfileEdit/PasswordEdit'
import Footer from '../components/Footer'
import { Route, Switch, useRouteMatch } from 'react-router'

const ProfileEdit = () => {
    let { url, path } = useRouteMatch();
    return (
        <div className="page-container">
            <main className="profile-edit-container">
                <EditSidebar url={url}/>
                <section className="profile-edit-feature">
                    <Switch>
                        <Route exact path={`${path}`}>
                            <BasicProfileEdit/>
                        </Route>
                        <Route path={`${path}/password`}>
                            <PasswordEdit/>
                        </Route>
                    </Switch>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default ProfileEdit;