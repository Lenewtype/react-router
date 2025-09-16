import { games } from "../data";

export const GameList = () => {

    return (
        <p className="gameList">
            {games.map((game) => (
                <label key={game.id}>
                    <span>{game.name}</span>
                    <input
                        type="checkbox"
                        name={game.name}
                        value={game.id}
                    />
                </label>
            ))}
        </p>
    );

}