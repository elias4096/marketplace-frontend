import { Alert } from "react-bootstrap";

function ResultBox({ result }) {
    if (!result) return null;

    const variant = result.success ? "success" : "danger";
    const message = result.message ?? (result.success ? "Success" : "An error occurred");

    return (
        <Alert variant={variant}>
            {message}
        </Alert>
    );
}

export default ResultBox;