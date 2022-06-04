export const calcRadiusFromZoom = (zoom: number) => {
    let radius;
    switch (zoom) {
        case 13:
            radius = 2000;
            break;
        case 14:
            radius = 1000;
            break;
        case 15:
            radius = 500;
            break;
        case 16 || 17 || 18:
            radius = 300;
            break;
        default:
            radius = 3000;
            break;
    }
    return radius;
}

export const calcRangeFromZoom = (zoom: number) => {

    let range;
    if (zoom < 13) {
        range = 5;
    } else {
        range = 17 - zoom;
    }

    if (range <= 0) {
        range = 1;
    }

    return range;
}