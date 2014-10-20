# Landscapes Platform CF Templates

## Mongo.json
After running `jsonlint` on `Mongo.json` and comparing what is output by
Spatula:

```bash
$ diff Mongo_spatula_lint.json Mongo_lint.json 

70d69
<   "Conditions": {},
169,170c168
<   },
<   "Outputs": {}
---
>   }
```
The only difference appears to be that Spatula contains explicit top-level
definitions for the unused `Conditions` and `Outputs` Template properties.

## OpenVPN.json
After running `jsonlint` on `OpenVPN.json` and comparing what is output by
Spatula:

```bash
WARNING: Unable to find Spatula class for AWS::EC2::EIP
WARNING: Unable to find Spatula class for AWS::EC2::EIPAssociation
WARNING: Unable to find Spatula class for AWS::Route53::RecordSet
```

### After Adding missing classes:
```bash
$ diff OpenVPN_lint.json OpenVPN_spatula_lint.json 
94a95
>   "Conditions": {},
```

Good!

## Twitter.json
```bash
$ diff Twitter_lint.json Twitter_spatula_lint.json 
73a74
>   "Conditions": {},
137c138,139
<   }
---
>   },
>   "Outputs": {}
```
The only difference appears to be that Spatula contains explicit top-level
definitions for the unused `Conditions` and `Outputs` Template properties.

## VPC.json
```bash
WARNING: Unable to find Spatula class for AWS::EC2::RouteTable
WARNING: Unable to find Spatula class for AWS::EC2::Route
WARNING: Unable to find Spatula class for AWS::EC2::SubnetRouteTableAssociation
WARNING: Unable to find Spatula class for AWS::EC2::NetworkAcl
WARNING: Unable to find Spatula class for AWS::EC2::NetworkAclEntry
WARNING: Unable to find Spatula class for AWS::EC2::NetworkAclEntry
WARNING: Unable to find Spatula class for AWS::EC2::SubnetNetworkAclAssociation
WARNING: Unable to find Spatula class for AWS::EC2::RouteTable
WARNING: Unable to find Spatula class for AWS::EC2::Route
WARNING: Unable to find Spatula class for AWS::EC2::SubnetRouteTableAssociation
WARNING: Unable to find Spatula class for AWS::EC2::NetworkAcl
WARNING: Unable to find Spatula class for AWS::EC2::NetworkAclEntry
WARNING: Unable to find Spatula class for AWS::EC2::NetworkAclEntry
WARNING: Unable to find Spatula class for AWS::EC2::SubnetNetworkAclAssociation
WARNING: Unable to find Spatula class for AWS::EC2::EIP
WARNING: Unable to find Spatula class for AWS::EC2::EIP
WARNING: Unable to find Spatula class for AWS::EC2::EIP
WARNING: Unable to find Spatula class for AWS::Route53::RecordSet
WARNING: Unable to find Spatula class for AWS::Route53::RecordSet
```

We will need to create 8 new classes:

+ AWS::EC2::EIP
+ AWS::EC2::NetworkAcl
+ AWS::EC2::NetworkAclEntry
+ AWS::EC2::Route
+ AWS::EC2::RouteTable
+ AWS::EC2::SubnetNetworkAclAssociation
+ AWS::EC2::SubnetRouteTableAssociation
+ AWS::Route53::RecordSet

### After adding missing classes
```bash
$ diff VPC_lint.json VPC_spatula_lint.json 
213a214
>   "Conditions": {},
```
