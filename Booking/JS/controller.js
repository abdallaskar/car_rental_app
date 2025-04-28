export function controlDateView(){
    const today = new Date().toISOString().split("T")[0];
    document.querySelectorAll(`input[type="date"]`).forEach(input => {
        input.setAttribute("min", today);
    });
}