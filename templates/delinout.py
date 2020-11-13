import pymongo
from pymongo import MongoClient
import json


client = MongoClient("mongodb+srv://vaReadUpdate:vaAnalysis2020@cluster0-ujflt.mongodb.net/vAnalysis?retryWrites=true&w=majority")
db = client["vAnalysis"]
coll = db["vis_ent_exit"]

myquery = { "In_out_ind": 1 }

x = coll.delete_many(myquery)

print(x.deleted_count, " documents deleted.")