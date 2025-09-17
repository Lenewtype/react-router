import { useEffect, useState } from "react";
import { games } from "../data";

type Props = {
    initialSelected?: number[];
};

export const GameList = ({ initialSelected = [] }: Props) => {
    const [selected, setSelected] = useState<Set<number>>(new Set(initialSelected));

    useEffect(() => {
        setSelected(new Set(initialSelected));
    }, [initialSelected]);

    const handleToggle = (id: number) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <p className="gameList">
            {games.map((game) => (
                <label key={game.id}>
                    <span>{game.name}</span>
                    <input
                        type="checkbox"
                        name={`game_${game.id}`}
                        value={game.id}
                        checked={selected.has(game.id)}
                        onChange={() => handleToggle(game.id)}
                    />
                </label>
            ))}
        </p>
    );
};