import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { storageUpgrade } from '../redux/earn';
import { RootState } from '../redux/store';
import { toCss } from '../upgrades/upgrades';
import { useLocation } from 'react-router-dom'

import './App.scss';
import Debug from './pages/debug';
import Index from './pages/Index';
import LoadOut from './pages/loadout';
import store, { findPossibleUpgrades } from './pages/store';
import { casino } from '../upgrades/upgrades';
import Casino from './pages/casino';
import Club from './pages/club';
import Tutorial from './pages/tutorial';
interface NavButtonProps {
    text: string;
    link: string;
}
const NavButton: React.FC<NavButtonProps> = ({ text, link }) => {
    const location = useLocation()
    return <div className={`navbutton ${location.pathname === link ? "active" : "inactive"}`}><li>
        <Link to={link}>{text}</Link>
    </li></div>;
}
const App: React.FC<{}> = () => {
    const l = findPossibleUpgrades().length;
    const msg = l > 0 ? `(${l} upgade${l > 1 ? "s" : ""})` : ""
    const equipped = useSelector<RootState, storageUpgrade[]>(state => state.money.equippedUpgrades)
    const cssString = toCss(equipped)
    const isCasino = equipped.some(x => x.name === casino.name)
    const isBillionaire = equipped.some(x => x.name === "billionaire club")
    const isTutorial = equipped.some(x => x.name === "tutorial")

    return <div id="app" className={`app ${cssString}`}>
        <div className="content">
            <div className="navbar">
                <NavButton link="/" text="Home" />
                <NavButton link="/LoadOut" text="Load Out" />
                <NavButton link="/store" text={`Store ${msg}`} />
                <NavButton link="/debug" text="debug" />
                {isTutorial && <NavButton link="/tutorial" text="Tutorial" />}
                {isCasino && <NavButton link="/casino" text="Casino" />}
                {isBillionaire && <NavButton link="club" text="Billionaire Club" />}
            </div>
            <br />
            <div className="body">
                <Route exact path="/" component={Index} />
                <Route path="/LoadOut" component={LoadOut} />
                <Route path="/debug" component={Debug} />
                <Route path="/store" component={store} />
                <Route path="/tutorial" component={Tutorial} />
                <Route path="/casino" component={Casino} />
                <Route path="/club" component={Club} />
            </div>
        </div>
    </div>;
};

export default hot(App);
