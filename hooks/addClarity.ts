"use client"

import Clarity from '@microsoft/clarity';
import {useEffect} from 'react';
// Make sure to add your actual project id instead of "yourProjectId".
const projectId = "xxkmx1xt6h";

export default function AddClarity() {
    useEffect(() => {
        Clarity.init(projectId);
    }, [])
}