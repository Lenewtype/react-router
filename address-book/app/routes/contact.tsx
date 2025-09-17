import { Form, useFetcher } from "react-router";
import type { Route } from "./+types/contact";
import { type ContactRecord, getContact, updateContact, games } from "../data";
import { FakeTwitchLogo } from "../fakeTwitchLogo";

export async function loader({ params }: Route.LoaderArgs) {
    const contact = await getContact(params.contactId);

    if (!contact) {
        throw new Response("Not Found", { status: 404 });
    }
    return { contact };
}

export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
}

export default function Contact({ loaderData }: Route.ComponentProps) {
    const { contact } = loaderData;
    return (
        <div id="contact">
            <div>
                <img
                    alt={`${contact.username} avatar`}
                    key={contact.avatar}
                    src={contact.avatar}
                />
            </div>

            <div>
                <h1>
                    {contact.username ? (
                        <a href={`  https://twitch.com/${contact.username}`} target="_blank" rel="noreferrer">
                            {contact.username} {contact.partner ? <FakeTwitchLogo /> : null}
                        </a>
                    ) : (
                        <i>No Name</i>
                    )}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter ? (
                    <p>
                        <a
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                ) : null}

                {contact.games && contact.games.length > 0 ? (
                    <div>
                        <h2>Games</h2>
                        <ul>
                            {games.map((game) => {
                                if (contact.games?.includes(game.id))
                                    return (<li key={game.id}>{game.name}</li>);
                            })}
                        </ul>
                    </div>
                ) : null}

                {contact.notes ? <p>{contact.notes}</p> : null}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>

                    <Form
                        action="destroy"
                        method="post"
                        onSubmit={(event) => {
                            const response = confirm(
                                "Please confirm you want to delete this record.",
                            );
                            if (!response) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({
    contact,
}: {
    contact: Pick<ContactRecord, "favorite">;
}) {

    const fetcher = useFetcher();
    const favorite = fetcher.formData ? fetcher.formData.get("favorite") === "true" : contact.favorite;

    return (
        <fetcher.Form method="post">
            <button
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
                name="favorite"
                value={favorite ? "false" : "true"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
