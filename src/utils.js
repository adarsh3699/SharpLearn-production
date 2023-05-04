function handleCartAddition(CourseId) {
    console.log('CourseId', CourseId);
    const userCart = JSON.parse(localStorage.getItem('user_cart')) || [];
    if (!userCart.includes(CourseId)) {
        userCart.push(CourseId);
    }
    localStorage.setItem('user_cart', JSON.stringify(userCart));
}

export { handleCartAddition }