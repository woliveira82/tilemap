import numpy as np


class Map:
    
    def __init__(self, height, width, rooms, halls, type='default'):
        self.height = height
        self.width = width
        self.rooms = rooms
        self.halls = halls
        self.type = type
        self.map = np.random.randint(1, high=5, size=(self.width, self.height))
        
    def to_list(self):
        return {'map': self.map.tolist()}
    