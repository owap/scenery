var InstanceProfile = function (path, roles) {
    this.node = {
        Type: "AWS::IAM::InstanceProfile",
        "Properties": {
            "Path": path
        }
    }
    if (!(roles instanceof Array)) {
        roles = [roles];
    }
    this.node.Properties.Roles = roles;
    return this;
};

module.exports = InstanceProfile;