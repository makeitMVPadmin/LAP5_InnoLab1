import { EventInfo, Container, Wrapper, CardImage, TopTagsContainer, Tag, BottomTagsContainer, FavIcon, CardDetails, Button, ThemesContainer } from "./EventCard.styled";
import { convertToTimeZone, calculateDuration, countDown } from "../../utils/dateAndTimeFunctions";
import HeartIcon from "../../assets/images/heart.png";
import { v4 as uuidv4 } from 'uuid';

interface EventCardProps {
    title: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    skillLevel: string;
    themes: string[];
}

const EventCard: React.FC<EventCardProps> = ({ title, startTime, endTime, timeZone, skillLevel, themes }) => {
    const formattedDate = `${convertToTimeZone(startTime, timeZone)} ${timeZone}`;
    const eventDuration = calculateDuration(startTime, endTime);

    const themesWithIds = themes.map((theme) => ({
        id: uuidv4(),
        name: theme,
    }));

    return (
        <Container>
            <CardImage image="https://via.placeholder.com/150" alt="hackathon event">
                <Wrapper>
                    <TopTagsContainer >
                        <Tag>{countDown(startTime, "Online")}</Tag>
                        <Tag>{eventDuration}</Tag>
                    </TopTagsContainer>
                    <BottomTagsContainer>
                        <div>
                            <Tag>{skillLevel}</Tag>
                        </div>
                        <FavIcon>
                            <img src={HeartIcon} alt="heart icon" />
                        </FavIcon>
                    </BottomTagsContainer>
                </Wrapper>
            </CardImage>
            <CardDetails>
                <EventInfo>
                    <h3>{title}</h3>
                    <p>{formattedDate}</p>
                    <ThemesContainer>
                        {themesWithIds.map((theme) => (
                            <span key={theme.id}>{theme.name}</span>
                        ))}
                    </ThemesContainer>
                </EventInfo>
                <Button><span>View Event</span></Button>
            </CardDetails>
        </Container>
    )
}

export default EventCard;