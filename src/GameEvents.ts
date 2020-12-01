interface IGameEvents {
    onStart();
    onExit();

    onEnd(level: number, score: number);
    onNewLeve(level:number);
    onFire();
    onKill();
}