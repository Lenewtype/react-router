import { Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/edit-contact";

import { GameList } from "../components/GameList";
import { getContact, updateContact } from "../data";

export async function loader({ params }: Route.LoaderArgs) {
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("Not Found", { status: 404 });
    }
    return { contact };
}

export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact({
    loaderData,
}: Route.ComponentProps) {
    const { contact } = loaderData;
    const navigate = useNavigate();

    return (
        <Form key={contact.id} id="contact-form" method="post">
            <label>
                <span>Username</span>
                <input
                    aria-label="First name"
                    defaultValue={contact.username}
                    name="username"
                    placeholder="Username"
                    type="text"
                />
            </label>
            <label>
                <span>Partner</span>
                <input
                    aria-label="Partner"
                    value="partner"
                    name="partner"
                    type="checkbox"
                />
            </label>
            <label>
                <span>Twitter</span>
                <input
                    defaultValue={contact.twitter}
                    name="twitter"
                    placeholder="@jack"
                    type="text"
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    aria-label="Avatar URL"
                    defaultValue={contact.avatar}
                    name="avatar"
                    placeholder="https://example.com/avatar.jpg"
                    type="text"
                />
            </label>
            <p>
                <span>Games</span>
                <GameList />
            </p>
            <label>
                <span>Notes</span>
                <textarea
                    defaultValue={contact.notes}
                    name="notes"
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </p>
        </Form>
    );
}
