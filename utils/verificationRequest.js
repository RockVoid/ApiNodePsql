export const todoState = (todo, doing, done) => {
    if (todo) {
        doing = false;
        done = false;
    } else if(doing) {
        todo = false;
        done = false;
    } else {
        done = true;
        todo = false;
        doing = false;
    }

    return { todo, doing, done };
}