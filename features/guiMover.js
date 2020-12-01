

export function initiateGuiMover() {
    //selection
    let isSelected = false;
    let isTimerSelected = false;
    function clickFunc(mouseX, mouseY) {
        if (
            mouseX > global.hoeutils.display.getRenderX() - 2 && mouseX < global.hoeutils.display.getRenderX() + global.hoeutils.display.getWidth() + 2 &&
            mouseY > global.hoeutils.display.getRenderY() - 1 && mouseY < global.hoeutils.display.getRenderY() + (global.hoeutils.display.getHeight() * 9 + global.hoeutils.display.getHeight()*2)*global.hoeutils.scale
        ) {
            isSelected = true;
            global.hoeutils.display.setBackgroundColor(Renderer.color(255, 255, 255, 50));
        }
        if (
            mouseX > global.hoeutils.timerDisplay.getRenderX() - 2 && mouseX < global.hoeutils.timerDisplay.getRenderX() + global.hoeutils.timerDisplay.getWidth() + 2 &&
            mouseY > global.hoeutils.timerDisplay.getRenderY() - 1 && mouseY < global.hoeutils.timerDisplay.getRenderY() + (global.hoeutils.timerDisplay.getHeight() * 9 + global.hoeutils.timerDisplay.getHeight()*2)*global.hoeutils.scale
        ) {
            isTimerSelected = true;
            global.hoeutils.timerDisplay.setBackgroundColor(Renderer.color(255, 255, 255, 50));
        }
    }
    global.hoeutils.display.setRenderLoc(global.hoeutils.data.hud.x, global.hoeutils.data.hud.y);
    global.hoeutils.timerDisplay.setRenderLoc(global.hoeutils.data.timer.x, global.hoeutils.data.timer.y);

    function dragFunc(mouseX, mouseY) {
        if (isSelected) {
            global.hoeutils.data.hud.x = mouseX;
            global.hoeutils.data.hud.y = mouseY;
            global.hoeutils.display.setRenderLoc(mouseX, mouseY);
        }
        else if (isTimerSelected) {
            global.hoeutils.data.timer.x = mouseX;
            global.hoeutils.data.timer.y = mouseY;
            global.hoeutils.timerDisplay.setRenderLoc(mouseX, mouseY);
        }
    }

    function releaseFunc() {
        //standard
        isSelected = false;
        global.hoeutils.display.setBackgroundColor(Renderer.color(0, 0, 0, 0));
        //event
        isTimerSelected = false;
        global.hoeutils.timerDisplay.setBackgroundColor(Renderer.color(0, 0, 0, 0));
    }

    global.hoeutils.gui.registerMouseDragged(dragFunc);
    global.hoeutils.gui.registerClicked(clickFunc);
    global.hoeutils.gui.registerMouseReleased(releaseFunc);
}
export function guiMover() {
    if (global.hoeutils.gui.isOpen()) {
        Renderer.drawRect(
            Renderer.color(0, 0, 0, 70),
            0,
            0,
            Renderer.screen.getWidth(),
            Renderer.screen.getHeight()
        );
    }
}