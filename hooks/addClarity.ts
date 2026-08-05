import Clarity from '@microsoft/clarity';

// Make sure to add your actual project id instead of "yourProjectId".
const projectId = "yourProjectId"

export default function AddClarity() {
    Clarity.init(projectId);
}