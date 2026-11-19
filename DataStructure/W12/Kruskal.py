parent = []
set_size = 0

def init_set(nSets) :
    global set_size, parent
    set_size = nSets
    for i in range(nSets):
        parent.append(-1)
    print("parent_init = ", parent)
    
def find(id) :
    while (parent[id] >= 0) :
        id = parent[id]
    return id

def union(s1, s2) :
    global set_size
    parent[s1] = s2
    set_size = set_size - 1

def MSTKruskal(vertex, adj):
    vsize = len(vertex)
    init_set(vsize)
    eList = []
    
    for i in range(vsize - 1) :
        for j in range(i + 1, vsize) :
            if adj[i][j] != None :
                eList.append((i, j, adj[i][j]))
                
    eList.sort(key = lambda e : e[2], reverse=True)
    
    edgeAccepted = 0
    while ( edgeAccepted < vsize - 1) :
        e  = eList.pop(-1)
        uset = find(e[0])
        print("현재 e = ", e)
        print("e[0] = ", uset)
        vset = find(e[1])
        print("e[1] = ", vset)
        
        if uset != vset :
            print("간선 추가 : (%s, %s, %d)" %
                  (vertex[e[0]], vertex[e[1]], e[2]))
            union(uset, vset)
            edgeAccepted += 1
            
            
if __name__ == "__main__":
    weight = [ [None,	29,		None,	None,	None,   10,		None],
               [29,		None,	16,		None,	None,	None,	15  ],
               [None,	16,		None,	12,		None,	None,	None],
               [None,	None,   12,		None,	22,		None,	18  ],
               [None,	None,	None,   22,		None,	27,		25  ],
               [10,		None,	None,	None,   27,		None,	None],
               [None,   15,		None,   18,		25,		None,	None]]    
    vertex =   ['A',    'B',    'C',    'D',    'E',    'F',    'G' ]

    print("시작")
    MSTKruskal(vertex, weight)
