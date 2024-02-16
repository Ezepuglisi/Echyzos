export const traductorColores = (color) => {
    switch (color){
        case 'negro':
            return 'black'
        case 'rojo':
            return 'red'
        case 'rosa':
            return 'pink'
        case 'lila':
            return 'purple'
        case 'blanco':
            return 'grey'
        case 'amarillo':
            return 'yellow'
        case 'verde':
            return 'green'
        case 'azul':
            return 'blue'
        case 'celeste': 
            return 'lightblue'
        case 'violeta':
            return 'violet'
        case 'turquesa':
            return 'turquoise'
        default:
            return 'azure'
    }
}