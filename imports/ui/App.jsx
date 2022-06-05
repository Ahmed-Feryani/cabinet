import React from 'react'

import Home from './pages/Home.js'

import { Routes, Route, Navigate } from 'react-router-dom'

import ProfilePage from './pages/ProfilePage.js'

import { useTracker } from 'meteor/react-meteor-data'
import AddServicePage from './pages/AddServicePage.js'
import ServicesPage from './pages/ServicesPage.js'
import ServicePage from './pages/ServicePage.js'
import Snackbars from './components/snackBar/SnackBar.js'

import './style.css'
import '../../client/i18n'

import ProvidersPage from './pages/ProvidersPage.js'
import ClientsPage from './pages/ClientsPage.js'
import NotificationsPage from './pages/NotificationsPage.js'

import DashBoardPage from './pages/DashBoardPage.js'
import AskRdvPage from './pages/AskRdvPage.js'
import RdvListPage from './pages/RdvListPage.js'
import FixRdvPage from './pages/FixRdvPage.js'
import UsersPage from './pages/UsersPage.js'
import AddConsultationPage from './pages/AddConsultationPage.js'
import ConsultationPage from './pages/ConsultationPage.js'
//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
export const App = () => {
  const isAuthenticated = useTracker(() => {
    return Meteor.userId()
  })

  return (
    <div>
      <Snackbars></Snackbars>
      <Routes>
        <Route
          exact
          path="/add-consultation/:id/:userId"
          element={<AddConsultationPage></AddConsultationPage>}
        ></Route>
        <Route
          exact
          path="/consultation/:id"
          element={<ConsultationPage></ConsultationPage>}
        ></Route>
        <Route
          exact
          path="/dashboard/:id"
          element={<DashBoardPage></DashBoardPage>}
        ></Route>
        <Route exact path="/users" element={<UsersPage></UsersPage>}></Route>
        <Route exact path="/rdv" element={<RdvListPage></RdvListPage>}></Route>
        <Route
          exact
          path="/ask-rdv/:id"
          element={<AskRdvPage></AskRdvPage>}
        ></Route>
        <Route
          exact
          path="/fix-rdv/:id"
          element={<FixRdvPage></FixRdvPage>}
        ></Route>
        <Route
          exact
          path="/providers"
          element={<ProvidersPage></ProvidersPage>}
        ></Route>
        <Route
          exact
          path="/notifications"
          element={<NotificationsPage></NotificationsPage>}
        ></Route>
        <Route
          exact
          path="/clients"
          element={<ClientsPage></ClientsPage>}
        ></Route>
        <Route exact path="/" element={<Home></Home>} />

        <Route exact path="/services" element={<ServicesPage></ServicesPage>} />

        <Route
          exact
          path="/profile/:id"
          element={<ProfilePage></ProfilePage>}
        />

        <Route
          exact
          path="/service/:id"
          element={<ServicePage></ServicePage>}
        />

        <Route
          exact
          path="/add_service/:id"
          element={<AddServicePage></AddServicePage>}
        />
      </Routes>
    </div>
  )
}
