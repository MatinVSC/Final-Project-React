import styled from "styled-components";
import { useUserLogin } from "../hooks/useUserLogin";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Page = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;


export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // load the authenticated user
    const {isLoading, isAuthenticated } = useUserLogin();

    // if there is no authenticated user, redirect to the /login
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate('/login')
    },
        [isAuthenticated, isLoading, navigate]);

    // while loading show a sppiner
    if (isLoading) return (
        <Page>
            <Spinner />
        </Page>
    )

    // is there is a user, render the app
    if (isAuthenticated) return children;
}