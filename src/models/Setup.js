import {TodoListModel} from './Store.js';

const setupRootStore = () => {
    const rootTree = TodoListModel.create({
        todos : [
            // {
            //     id: '12345abcd',
            //     priority: 'low',
            //     text: 'xyz',
            //     isComplete: true
            // },
            // {
            //     id: '6789abcd',
            //     priority: 'medium',
            //     text: 'tuvwxyz',
            //     isComplete: true
            // },
            // {
            //     id: '92345abcd',
            //     priority: 'low',
            //     text: 'xyz',
            //     isComplete: true
            // },
            // {
            //     id: '8789abcd',
            //     priority: 'medium',
            //     text: 'tuvwxyz',
            //     isComplete: true
            // }
        ]
    })

    return {rootTree}
}

export default setupRootStore