'use client'
import {useState} from 'react';
import {IconHome, IconLogout, IconSwitchHorizontal, IconUserHexagon,} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import Link from "next/link";

const data = [
    { link: '/dashboard', label: 'Home', icon: IconHome },
    { link: '/customers', label: 'Customers', icon: IconUserHexagon },
];

export default function NavbarSimple() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <>
            <div className={classes.navbarMain}>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </>
    );
}