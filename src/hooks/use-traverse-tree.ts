export const useTraverseTree = () => {
    function insertNode(tree : any,folderId: string,item: any,isFolder: boolean){
        if(tree.id === folderId && tree.isFolder){
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items:[]
            })
            return tree;
        }

        let latestNode = [];
        latestNode = tree.items.map((ob: any) => {
            return  insertNode(ob,folderId,item,isFolder);
        });

        return {...tree,items : latestNode};
    }

    function deleteNode (
        tree: any,
        prevNode: any,
        nodeId: string
    ) {
        // console.log(tree,nodeId);
        if (tree.id === nodeId) {
            // console.log(tree);
            const index = prevNode.items.findIndex((item: any) => {
                return item.id === nodeId;
            })
            // console.log(index);
            prevNode.items.splice(index,1);
            // console.log(tree);
            return tree;
        }

        tree.items.map((ob: any) => {
          return deleteNode(ob,tree, nodeId);
        });

        return { ...tree };
    }

    function updateNode(
        tree: any,
        nodeId: string,
        newName: string
    ){
        if(tree.id === nodeId){
            tree.name = newName;
            return tree;
        }

        const latestNode = tree.items.map((item: any) => {
            return updateNode(item,nodeId, newName);
        });

        return {...tree};
    }

    return {insertNode,deleteNode, updateNode};
};

