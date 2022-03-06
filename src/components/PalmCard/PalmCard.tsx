import "./PalmCard.scss";
import Card from "@mui/material/Card";

interface IPalmCardProps {
    children: React.ReactNode;
}

function PalmCard({ children }: IPalmCardProps) {
    return (
        <Card className="palm-card" elevation={3}>
            {children}
        </Card>
    );
}

export default PalmCard;
